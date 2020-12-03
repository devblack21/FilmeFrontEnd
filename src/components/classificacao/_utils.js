//classificação de idades
export const _idades = [0, 10, 12, 14, 16, 18];

//cores de cada classificação
export const _cor = {
  18: '#000000',
  16: '#ff0011',
  14: '#ff7700',
  12: '#ffcc00',
  10: '#00ccff',
  0: '#00ee00',
};

//texto de cada idade
export const _texto = {
  18: '18',
  16: '16',
  14: '14',
  12: '12',
  10: '10',
  0: 'L',
};

//retorna cor pela idade
export function _getCor(idade) {
  if (idade > 16) return _cor[18];
  if (idade > 14) return _cor[16];
  if (idade > 12) return _cor[14];
  if (idade > 10) return _cor[12];
  if (idade > 0) return _cor[10];
  return _cor[0];
}

//retorna texto pela idade
export function _getTexto(idade) {
  if (idade > 16) return _texto[18];
  if (idade > 14) return _texto[16];
  if (idade > 12) return _texto[14];
  if (idade > 10) return _texto[12];
  if (idade > 0) return _texto[10];
  return _texto[0];
}
