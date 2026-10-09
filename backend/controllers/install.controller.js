// import the install service to handle communication with the database
const installService = require('../services/install.service');

// create a function to handle the install request
const install = async (req, res) => {
  console.log('Install route hit');
  try {
    const installMessage = await installService.install();
    console.log('Install service result:', installMessage);

    return res.status(installMessage.status || 200).json({
      status: installMessage.status || 200,
      message: installMessage.message || 'Install completed.'
    });
  } catch (error) {
    console.error('Installation failed:', error);

    return res.status(500).json({
      status: 500,
      message: error.message || 'Failed to execute database installation.'
    });
  }
};

// export the install function for use in the application
module.exports = {
  install
};