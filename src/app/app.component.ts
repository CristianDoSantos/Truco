import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'TrucoTop';
  jogador = "";
  isPlaying = false;
  jogadores!: Jogador[];
  rodadas = [];
  jogadorAtualIndex = 0;
  turno = 0;
  rodadaAtual = 0;
  cartaVirada!: number;
  coringa!: number;

  ngOnInit(): void {
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

  distribuirCartas(jogadores: Jogador[], baralho: Carta[]) {
    for (let i = 0; i < 3; i++) {
      jogadores.forEach(jogador => {
          jogador.cartas.push(baralho.pop()!);
      });
    }

    this.definirCoringa(baralho.pop()!);
    
    return jogadores;    
  }

  definirCoringa(carta: Carta) {
    this.cartaVirada = carta.valor;
    if(carta.valor == Valor.REI) {
      this.coringa = Valor.AS
    }else {
      this.coringa = carta.valor + 1;
    }
  }

  iniciarJogo() {
    if(this.jogador.trim().length > 0){
      this.isPlaying = true;
      let nomesJogadores: string[] = ["Bot", this.jogador]
      const jogadores: Jogador[] = nomesJogadores.map(nome => ({ nome, cartas: [], pontos: 0 }));
      const baralho: Carta[] = this.embaralhar(this.criarBaralho());
      this.jogadores = this.distribuirCartas(jogadores, baralho);
      this.reset();
    }
  }

  reset() {
    this.rodadas = [];
    this.jogadorAtualIndex = 0;
    this.turno = 0;
    this.rodadaAtual = 0;
  }

  escolherAleatoriamente<T>(opcao1: T, opcao2: T): T {
    const indiceAleatorio = Math.random() < 0.5 ? 0 : 1;
    return indiceAleatorio === 0 ? opcao1 : opcao2;
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