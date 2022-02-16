let POOLS = [
  {
    id: "0",
    name: "Superman vs Batman",
    question: "Who is stronger Superman or Batman?",
    owner: "artyom_fokin.testnet",
    deleted: false,
  },
  {
    id: "1",
    name: "Round earth",
    question: "Is the earth round?",
    owner: "artyom_fn.testnet",
    deleted: false,
  },
];
let POOL_UNIQE_ID = POOLS.length;

let OPTIONS = [
  {
    id: "0",
    poolId: "0",
    value: "Superman",
  },
  {
    id: "1",
    poolId: "0",
    value: "Batman",
  },
  {
    id: "2",
    poolId: "1",
    value: "Yes",
  },
  {
    id: "3",
    poolId: "1",
    value: "No",
  },
];
let OPTION_UNIQE_ID = OPTIONS.length;

let VOTES = [
  {
    optionId: "1",
    accountId: "acc1",
  },
  {
    optionId: "1",
    accountId: "acc2",
  },
  {
    optionId: "1",
    accountId: "acc3",
  },
  {
    optionId: "1",
    accountId: "acc4",
  },
  {
    optionId: "2",
    accountId: "acc5",
  },
];

const delay = async (t = 300) => {
  await new Promise((r) => setTimeout(r, t));
};

export const getPools = async () => {
  await delay();
  return POOLS;
};

export const getPool = async (id) => {
  console.log({ POOLS, id });
  return POOLS.find((pool) => pool.id === id);
};

export const getPoolOptions = async (poolId) => {
  await delay();
  const options = OPTIONS.filter((op) => op.poolId === poolId);
  return options;
};

export const getPoolVotes = async (poolId) => {
  await delay();
  const options = (await getPoolOptions(poolId)).map((op) => op.id);
  return VOTES.filter((vote) => options.includes(vote.optionId));
};

export const createPool = async ({ name, question, owner, options }) => {
  await delay();
  const pool = {
    id: POOL_UNIQE_ID.toString(),
    name,
    question,
    owner,
  };
  POOLS.push(pool);
  POOL_UNIQE_ID += 1;

  options.forEach((value) => {
    const option = {
      id: OPTION_UNIQE_ID.toString(),
      poolId: pool.id,
      value,
    };
    OPTIONS.push(option);
    OPTION_UNIQE_ID += 1;
  });

  console.log({ pool, OPTIONS });
  return true;
};

export const deletePool = async (poolId) => {
  await delay();
  const poolIndex = POOLS.findIndex((p) => p.id === poolId);
  if (poolIndex === -1) {
    throw new Error("Pool not found");
  }
  POOLS = [
    ...POOLS.slice(0, poolIndex),
    {
      ...POOLS[poolIndex],
      deleted: true,
    },
    ...POOLS.slice(poolIndex + 1),
  ];
};

export const crateVote = async (optionId, accountId) => {
  await delay();

  const vote = VOTES.find(
    (v) => v.optionId === optionId && v.accoundId === accountId
  );
  if (vote) {
    return false;
  }

  VOTES.push({
    optionId,
    accountId,
  });

  return true;
};

export const checkAccountVote = async (accountId, poolId) => {
  const poolVotes = await getPoolVotes(poolId);
  return poolVotes.some((vote) => vote.accountId === accountId);
};
