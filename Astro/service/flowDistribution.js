const Astro = require('../models/Astro');

exports.distributeUserToAstrologer = async(user)=> {
  const astrologers = await Astro.find().sort({ isTopAstrologer: -1, currentConnections: 1 });
  for (const astrologer of astrologers) {
    if (astrologer.currentConnections < astrologer.maxConnections) {
      astrologer.currentConnections++;
      await astrologer.save();
      user.connectedAstrologer = astrologer._id;
      return user.save();
    }
  }
  throw new Error('No available astrologers at the moment');
}

exports.adjustFlowForTopAstrologers = async(isIncrease)=> {
  const adjustment = isIncrease ? 5 : -5;
  const topAstrologers = await Astro.find({ isTopAstrologer: true });
  for (const astrologer of topAstrologers) {
    astrologer.maxConnections = Math.max(1, astrologer.maxConnections + adjustment);
    await astrologer.save();
  }
}
