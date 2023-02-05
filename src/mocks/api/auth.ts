export const login = async (req: any, res: any, ctx: any) => {
  const { userName }: { userName: string } = await req.json();
  if (userName === 'john') {
    return res(
      ctx.delay(3000),
      ctx.status(200),
      ctx.json({
        userName: 'john',
        token: 'token1234',
      }),
    );
  }
  return res(
    ctx.delay(3000),
    ctx.status(401),
    ctx.json({
      message: 'unauthorized',
    }),
  );
};
