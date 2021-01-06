export interface Unidade {
    idUnidade?: string,
    nome: string,
    endereco?: {
        rua: string,
        numero: number,
        bairro: string,
        cidade: string
    }
}