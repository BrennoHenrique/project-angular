import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CidadesService {
    private cidadesUrl: string;

    constructor(private http: HttpClient) {}
    
    public getCidades(sigla: string) {
        this.cidadesUrl = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${sigla}/distritos`; //API utilizada para listar os Municípios.
        
        return this.http.get<any[]>(`${this.cidadesUrl}`);
    }
}