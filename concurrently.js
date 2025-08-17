/* eslint-disable @typescript-eslint/no-require-imports */
const concurrently = require('concurrently');

async function startServices() {
  try {
    // Define the services to run
    const services = [
      {
        name: 'user-service',
        command: 'npm run dev --workspace apps/user-service',
        prefixColor: 'bgYellow',
      },
      {
        name: 'auth-service',
        command: 'npm run dev --workspace apps/auth-service',
        prefixColor: 'bgRedBright',
      },
      {
        name: 'kriyo-ui',
        command: 'npm run dev --workspace apps/kriyo-ui',
        prefixColor: 'bgBlueBright',
      },
      // Add additional services here in the future
    ];

    // Run the services concurrently
    concurrently(
      services.map((service) => ({
        command: service.command,
        name: service.name,
        prefixColor: service.prefixColor,
      })),
      {
        prefix: '{name}',
        killOthers: ['failure', 'success'], // Kill all processes if one exits
        restartTries: 3, // Optional: restart failed processes up to 3 times
      }
    );

    console.log('All services started successfully');
  } catch (err) {
    console.error('Error starting services:', err);
    process.exit(1);
  }
}

startServices();
