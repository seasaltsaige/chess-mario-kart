class Board {
  size = 800;
  cell = this.size / 8;
  /**
   * @type {Piece[]}
   */
  pieces = [];
  fen = "rnbqkbnr/pppppppp/4R3/8/8/8/PPPPPPPP/1NBQKBNR w KQkq - 0 1";

  /**
   * @private
   */
  pieceMap = { "p": Pawn, "r": Rook, "n": Knight, "b": Bishop, "q": Queen, "k": King };

  constructor() {
    this.setup();
  }

  /**
   * @private
   */
  setup() {
    const fenComponents = this.fen.split(" ");
    for (let i = 0; i < fenComponents.length; i++) {
      if (i === 0) {
        const fenOnePieces = fenComponents[i].split("/");
        y: for (let y = 0; y < fenOnePieces.length; y++) {
          let pieces = fenOnePieces[y].split("");
          for (let x = 0; x < pieces.length; x++) {
            const piece = pieces[x];
            if (!isNaN(parseInt(piece))) continue;
            const color = piece.toLowerCase() === piece ? "b" : "w";
            this.pieces.push(new this.pieceMap[piece.toLowerCase()](x, y, piece.toLowerCase(), color));
          }
        }
      }
    }
  }

  render() {
    canvas.width = this.size;
    canvas.height = this.size;

    const boardImage = document.getElementById("boardImage");
    ctx.drawImage(boardImage, 0, 0, 800, 800);

    for (const piece of this.pieces) {
      const pieceImage = document.getElementById(piece.color + piece.type);
      ctx.drawImage(pieceImage, piece.x * this.cell, piece.y * this.cell, this.cell, this.cell);
    }
  }

  /**
   * 
   * @param {[number, number][]} moves 
   */
  renderMoves(moves) {
    const img = document.getElementById("move");
    const take = document.getElementById("take");

    for (const m of moves) {
      const p = this.pieces.find(v => v.x === m[0] && v.y === m[1]);
      if (p !== undefined) ctx.drawImage(take, m[0] * this.cell, m[1] * this.cell, this.cell, this.cell)
      else ctx.drawImage(img, m[0] * this.cell, m[1] * this.cell, this.cell, this.cell);
    }
  }
}