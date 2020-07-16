import { Component, OnInit } from '@angular/core';
import { Siglas } from './siglas.service';
import { CidadesService } from './cidades.service';
import { SearchService } from './search.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {
  siglasArr: string[];
  siglas: Siglas;
  siglaSelected: string;

  public cidadesArr: Array<any>;
  public results;
  public boolResult: boolean = true;

  public disabledItems: boolean = true;
  public colorDisabledCepReverse: string = "10px 10px 0px #C00";
  public colorDisabledCep: string = "-10px -10px 0px #C00";
  public colorDisabledLogradouroReverse: string = "10px 10px 0px #C00";
  public colorDisabledLogradouro: string = "-10px -10px 0px #C00";

  constructor(private cidades: CidadesService, private resultado: SearchService) {
    this.siglas = new Siglas();
    this.colorBox(false);
  }

  colorBox = function (bool: boolean) {
    if (bool) {
      this.colorDisabledLogradouro = "-10px -10px 0px rgb(56, 231, 85)";
      this.colorDisabledLogradouroReverse = "10px 10px 0px rgb(56, 231, 85)";

      this.colorDisabledCepReverse = "-10px -10px 0px #C00";
      this.colorDisabledCep = "10px 10px 0px #C00";
    } else {
      this.colorDisabledCep = "-10px -10px 0px rgb(56, 231, 85)";
      this.colorDisabledCepReverse = "10px 10px 0px rgb(56, 231, 85)";

      this.colorDisabledLogradouroReverse = "-10px -10px 0px #C00";
      this.colorDisabledLogradouro = "10px 10px 0px #C00";
    }
  }

  checkSigla = function (sigla) {
    this.cidades.getCidades(sigla).subscribe(dados => this.cidadesArr = dados);
  }

  checkRepeatCidade = function () {
    let cont = 0;
    let auxCont = cont;

    for (let loop = 0; loop < this.cidadesArr.length; loop++) {
      auxCont = cont;

      for (let index = 1; index < this.cidadesArr.length; index++) {
        if (this.cidadesArr[index].municipio.nome == this.cidadesArr[index - 1].municipio.nome) {
          this.cidadesArr.splice(index - 1, 1);
          cont++;
        }
      }

      if (auxCont === cont) {
        break;
      }
    }
  }

  resultSearch(cep, uf, municipio, logradouro) {
    if (uf.length != 0 && municipio.length != 0 && logradouro.length >= 3) {
      this.resultado.getResultsLocalidade(uf, municipio, logradouro).subscribe(dados => this.results = dados);
    } else if (cep.length == 8) {
      this.resultado.getResultsCep(cep).subscribe(dados => this.results = dados);
    } else {
      alert("Algo esta fora dos parâmetros!");
    }

    console.log(this.results)
  }

  ngOnInit(): void {
    this.siglasArr = this.siglas.getSiglas();
  }
}
