module.exports = {
  async redirects() {
    return process.env.NEXT_PUBLIC_MAINTENANCE_MODE !== 'true'
      ? [
          {
            source: '/',
            destination: '/about',
            permanent: false,
          },
          {
            source: '/maintenance',
            destination: '/about',
            permanent: false,
          },
        ]
      : [];
  },
};
