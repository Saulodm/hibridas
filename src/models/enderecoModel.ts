import { LocalizacaoModel } from './localizacaoModel';
export class EnderecoModel {
    public id: number;
    public rua: string;
    public numero: string;
    public complemento: string;
    public cidade: string;
    public estado: string;
    public localizacao: LocalizacaoModel;
    public fotoBase64: string;
}