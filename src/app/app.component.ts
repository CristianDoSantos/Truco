import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'TrucoTop';


  ngOnInit(): void {
    this.iniciarJogo(["cris", "lucas"])
  }


  criarBaralho(): Carta[] {
    let baralho: Carta[] = [];
    for (let naipe in Naipe) {
      if (parseInt(naipe) > 0){
        for (let valor in Valor) {
          if (parseInt(valor) > 0){
              baralho.push({ valor: parseInt(valor), naipe: parseInt(naipe) });
            }            
        }
      }      
    }
    return baralho;
  }

  embaralhar(baralho: Carta[]): Carta[] {
    return baralho.sort(() => Math.random() - 0.5);
  }

  distribuirCartas(jogadores: Jogador[], baralho: Carta[]): void{
    for (let i = 0; i < 3; i++) {
        jogadores.forEach(jogador => {
            jogador.cartas.push(baralho.pop()!);
            console.log("opaaa", jogador.cartas)
        });
    }
    console.log("fim ", jogadores);
    
  }

  iniciarJogo(nomesJogadores: string[]): Jogo {
    const jogadores: Jogador[] = nomesJogadores.map(nome => ({ nome, cartas: [], pontos: 0 }));
    const baralho: Carta[] = this.embaralhar(this.criarBaralho());
    let teste = this.distribuirCartas(jogadores, baralho);

    console.log(jogadores);

    return {
        jogadores,
        rodadas: [],
        jogadorAtualIndex: 0,
        turno: 0,
        rodadaAtual: 0
    };
  }
}

enum Naipe {
  OUROS = 1,
  ESPADAS = 2,
  COPAS = 3,
  PAUS = 4
}

enum Valor {
  AS = 1,
  DOIS  = 2,
  TRES  = 3,
  QUATRO  = 4,
  CINCO  = 5,
  SEIS  = 6,
  SETE  = 7,
  DEZ  = 8,
  VALETE  = 9,
  DAMA  = 10,
  REI = 11
}

interface Carta {
  valor: Valor;
  naipe: Naipe;
}

type Jogador = {
  nome: string;
  cartas: Carta[];
  pontos: number;
}

type Rodada = {
  jogador1: Carta;
  jogador2: Carta;
  vencedor: Jogador | null;
}

type Jogo = {
  jogadores: Jogador[];
  rodadas: Rodada[];
  jogadorAtualIndex: number;
  turno: number;
  rodadaAtual: number;
}