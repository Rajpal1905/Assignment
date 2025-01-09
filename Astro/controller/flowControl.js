
const User = require('../models/User')
const Astrologer = require('../models/Astro')
const { distributeUserToAstrologer} = require('../service/flowDistribution');
const  logger  = require('../logger/logger')


exports.distribute = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'User name is required' });
    }

    const user = await User.create({ name });
    logger.info(`New user created: ${name}`);
    await distributeUserToAstrologer(user);

    const astrologer = await Astrologer.findById(user.connectedAstrologer);

    logger.info(`User ${user.name} connected to astrologer ${astrologer.name}`);
    res.status(200).json({
      message: 'User distributed successfully',
      user: { id: user._id, name: user.name, astrologer: astrologer.name },
    });

  } catch (err) {
    logger.error(`Error distributing user: ${err.message}`);
    res.status(500).json({ message: `Error distributing user: ${err.message}` });
  }
}

exports.adjustFlow = async (req, res) => {
  try {
    // Validate input
    const { isIncrease } = req.body;
    if (typeof isIncrease !== 'boolean') {
      return res.status(400).json({ message: 'Invalid input: isIncrease must be a boolean' });
    }

    // Adjust flow for top astrologers
    await adjustFlowForTopAstrologers(isIncrease);

    const adjustment = isIncrease ? 'increased' : 'decreased';
    logger.info(`Flow ${adjustment} for top astrologers`);
    res.status(200).json({ message: `Flow ${adjustment} successfully for top astrologers` });
  } catch (err) {
    logger.error(`Error adjusting flow: ${err.message}`);
    res.status(500).json({ message: `Error adjusting flow: ${err.message}` });
  }
}