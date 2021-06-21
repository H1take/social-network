import profileReducer, { addPostCreator, deletePost } from "./profile-reducer";

// test('length of posts should be incremented', () => {
//     // 1. data
//     // 2. action
//     // 3. expectation
//     let state = {
//         posts: [
//             {id: "1", message: "Hi, how are you", likesCount: 36},
//             {id: "2", message: "It's my first post", likesCount: 25},
//             {id: "3", message: "Blablabal", likesCount: 150},
//             {id: "4", message: "Dadadada", likesCount: 178}
//         ]
//     }

//     let action = addPostCreator("Hello World!")
//     let newState = profileReducer(state, action)

//     expect(newState.posts.length).toBe(5)

// });

test("after deleting lengths of messages should be decrementing", () => {
  // 1. data
  // 2. action
  // 3. expectation
  let state = {
    posts: [
      { id: "1", message: "Hi, how are you", likesCount: 36 },
      { id: "2", message: "It's my first post", likesCount: 25 },
      { id: "3", message: "Blablabal", likesCount: 150 },
      { id: "4", message: "Dadadada", likesCount: 178 },
    ],
  };

  let action = deletePost(2);

  let newState = profileReducer(state, action);

  expect(newState.posts.length).toBe(3);
});
