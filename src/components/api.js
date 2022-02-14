let POOLS = [
  {
    id: "1",
    name: "Superman vs Batman",
    question: "Who is stronger Superman or Batman?",
    owner: "artyom_fokin.testnet",
    options: ["Superman", "Batman"],
    answers: {
      Superman: 0,
      Batman: 0,
    },
  },
  {
    id: "2",
    name: "Round earth",
    question: "Is the earth round?",
    owner: "artyom_fn.testnet",
    options: ["Yes", "No"],
    answers: {
      Yes: 0,
      No: 0,
    },
  },
];

const delay = async (t = 300) => {
  await new Promise((r) => setTimeout(r, t));
};

export const getPools = async () => {
  await delay();
  return POOLS;
};

export const addPool = async (pool) => {
  await delay();
  POOLS.push(pool);
};

export const deletePool = async (poolId) => {
  await delay();
  POOLS = POOLS.filter((pool) => pool.id !== poolId);
};

export const getPool = async (pool) => {
  await delay();
  return POOLS.find((p) => p.id === pool);
};
