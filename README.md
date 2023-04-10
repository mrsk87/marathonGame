**Marathon Game Build on Phaser 3**

**Objetivo do jogo**

Coletar as estrelas e conseguir uma pontuação máxima de 100, enquanto
não for atingido, o jogo ira passar da cena 1 para a cena 2 e da cena 2 para
a cena 1 repetidamente.
O modo de dificuldade é composto consoante a pontuação, ate 30 pontos
tem dificuldade 1, ate 60 tem dificuldade 2, e mais de 60 tem a dificuldade
máxima, que é 3.
Quando é tocado por um objeto que não seja a estrela e a parte de baixo da
onda, dá game over.
Cada cena tem uma meta, sempre que colidir com a meta ou passar por
cima ate meio, o level será concluído com sucesso.

**Jogabilidade**

O movimento é feito com as setas do teclado, o player consegue saltar
mesmo quando esta no ar. O mesmo acontece quando esta na agua mas no
sentido inverso.

**Cheat**

O modo de cheat é ativado usando a tecla de e

| Command | Description |
|---------|-------------|
| `npm install` | Install project dependencies |
| `npm start` | Build project and open web server running project |
| `npm run build` | Builds code bundle with production settings (minification, uglification, etc..) |
