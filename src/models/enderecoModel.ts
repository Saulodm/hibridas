import { LocalizacaoModel } from './localizacaoModel';
export class EnderecoModel {
    public rua: string;
    public numero: string;
    public complemento: string;
    public cidade: string;
    public estado: string;
    public localizacao: LocalizacaoModel;
}