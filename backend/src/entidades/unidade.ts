export interface Unidade{
    nome: string,
    endereco?: {
        rua: string,
        numero: number,
        bairro: string,
        cidade: string
    }
}