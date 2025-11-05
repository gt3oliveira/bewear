import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { SignInForm } from "./_components/sign-in-form"
import { SignOutForm } from "./_components/sign-out-form"

export default function AuthenticationPage() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6 p-5">
      <Tabs defaultValue="sign-in">
        <TabsList>
          <TabsTrigger value="sign-in">Entrar</TabsTrigger>
          <TabsTrigger value="sign-up">Criar Conta</TabsTrigger>
        </TabsList>
        <TabsContent value="sign-in">
          <SignInForm />
        </TabsContent>
        <TabsContent value="sign-up">
          <SignOutForm />
        </TabsContent>
      </Tabs>
    </div>
  )
};