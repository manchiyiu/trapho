export default async (msg, reply) => {
  let mockTrips = [
                    {
                        "id": "58b5062cc9d49c000f114abc",
                        "name": "Taiwan Trip",
                        "userId": "58b5062cc9d49c000f114b3a",
                        "timestamp": "2017-03-02T16:39:27+00:00",
                        "locations": [
                            {
                                "id": "58c3e0cd041678000f384403",
                                "startTime": "2017-04-02T10:39:27+00:00",
                                "endTime": "2017-04-02T16:39:27+00:00",
                                "comment": "Must visit this, fun place!"
                            }
                        ]
                    }
                  ];

  reply(null, { trips: mockTrips });
};