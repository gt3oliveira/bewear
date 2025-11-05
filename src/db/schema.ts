import { relations } from "drizzle-orm";
import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
    id: uuid().defaultRandom().primaryKey(),
    name: text().notNull(),
});

export const categoryTable = pgTable("categories", {
    id: uuid().defaultRandom().primaryKey(),
    name: text().notNull(),
    slug: text().notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const categoryRelations = relations(categoryTable, ({ many }) => ({
    products: many(productTable),
}))

export const productTable = pgTable("products", {
    id: uuid().defaultRandom().primaryKey(),
    categoryId: uuid("category_id").notNull().references(() => categoryTable.id),
    name: text().notNull(),
    slug: text().notNull().unique(),
    description: text().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const productRelations = relations(productTable, ({ one, many }) => ({
    category: one(categoryTable, {
        fields: [productTable.categoryId],
        references: [categoryTable.id],
    }),
    variants: many(productVariantTable),
}))

export const productVariantTable = pgTable("product_variants", {
    id: uuid().defaultRandom().primaryKey(),
    productId: uuid("product_id").notNull().references(() => productTable.id),
    name: text().notNull(),
    slug: text().notNull().unique(),
    color: text().notNull(),
    priceInCents: integer("price_in_cents").notNull(),
    imageUrl: text("image_url").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const productVariantRelations = relations(productVariantTable, ({ one }) => ({
    product: one(productTable, {
        fields: [productVariantTable.productId],
        references: [productTable.id],
    }),
}))