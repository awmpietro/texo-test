/**
 * @function getAwardIntervals
 * @description Endpoint para obter o produtor com maior intervalo entre dois prêmios consecutivos, e o que obteve dois prêmios mais rápido;
 * @param {Object} req - Request do Express.
 * @param {Object} res - Response do Express.
 * @param {function} next - Função next do middleware do Express para continuar o fluxo ou capturar erros.
 */
const getAwardIntervals = async (req, res, next) => {
   try {
      res.json('ok');
   } catch (err) {
      next(err);
   }
};

module.exports = { getAwardIntervals };
