export const formatCentsToBRL = (cents: number) => {
    return Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
    }).format(cents / 100);
};