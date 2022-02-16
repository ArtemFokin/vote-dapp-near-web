import React, { useMemo } from "react";
import { useNear } from "../../hooks/near";
import groupBy from "lodash.groupby";
import { List, Row, Col } from "antd";

const PoolResult = ({ options, votes }) => {
  const { wallet } = useNear();
  const userAccount = useMemo(() => wallet.getAccountId(), [wallet]);
  const votesGroupByOption = useMemo(() => groupBy(votes, "optionId"), [votes]);

  const rechartData = useMemo(() => {
    return options.map((option) => {
      const optionVotes = votesGroupByOption[option.id] || [];
      return {
        name: option.value,
        votes: optionVotes.length,
        userVote: optionVotes.some((vote) => vote.accountId === userAccount),
      };
    });
  }, [options, userAccount, votesGroupByOption]);

  return (
    <List
      bordered
      dataSource={rechartData}
      renderItem={(item) => (
        <List.Item
          style={{ background: item.userVote ? "rgb(136 132 216 / 30%)" : "" }}
        >
          <Row
            justify="space-between"
            style={{ width: "100%", gap: "30px" }}
            wrap={false}
            align="middle"
          >
            <Col flex="auto">{item.name}</Col>
            <Col flex="none">{item.votes}</Col>
          </Row>
        </List.Item>
      )}
    />
    // <ResponsiveContainer width="100%" height={500}>
    //   <BarChart data={rechartData}>
    //     <Bar dataKey="votes" fill="#8884d8" background={{ fill: "#eee" }} />
    //     <YAxis type="number" />
    //     <XAxis type="category" dataKey="name" tickCount={0} />
    //     <Tooltip
    //       offset={0}
    //       wrapperStyle={{ background: "white" }}
    //       cursor={{ fill: "transparent" }}
    //     />
    //   </BarChart>
    // </ResponsiveContainer>
  );
};

export default PoolResult;
