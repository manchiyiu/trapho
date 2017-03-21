export default async (msg, reply) => {
  let mockComments = [
                    {
                        "id": "58b5062cc9d49c000f114abc",
                        "userId": "58b5062cc9d49c000f114b3a",
                        "timestamp": "2017-03-02T16:39:27+00:00",
                        "content": "wow. first!"
                    },
                    {
                        "id": "58b5062cc9d49c000f114def",
                        "userId": "58b5062cc9d49c000f114b3a",
                        "timestamp": "2017-03-02T16:40:27+00:00",
                        "content": "wow. second!"
                    }
                  ];
  reply(null, { comments: mockComments });
};