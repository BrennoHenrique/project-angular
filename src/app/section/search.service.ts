import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SearchService {
    private url: string;

    constructor(private http: HttpClient) {}

    getResultsCep(cep) {
        this.url = `https://viacep.com.br/ws/${cep}/json/`; //API utilizada para retornar os dados do endereço.

        return this.http.get<any>(`${this.url}`);
    }

    getResultsLocalidade(uf, municipio, logradouro) {
        this.url = `https://viacep.com.br/ws/${uf}/${municipio}/${logradouro}/json/`; //API utilizada para retornar os dados do endereço.

        return this.http.get<any>(`${this.url}`);
    }
}