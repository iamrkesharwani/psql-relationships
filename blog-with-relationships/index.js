import * as event from './utils/userController.js';

const startApp = async () => {
  const user1 = await event.createUser('Rahul', 'rahul@email.com');
  const user2 = await event.createUser('Amit', 'amit@email.com');
  const user3 = await event.createUser('Ankit', 'ankit@email.com');

  await event.createPost('PostgreSQL', 'A reliable database', user1);
  await event.createPost('JavaScript', 'Amazing Web Language', user1)
  await event.createPost('HTML', 'Markup Language', user2)

  const feed = await event.getPostUsersWithLeftJoin();
  console.log('Current Feed:', feed);

  // await event.deleteUser(user1);
  // const remainingPosts = await event.getPostUsersWithLeftJoin();
  // console.log('Posts left wit user:', remainingPosts.length);
};

startApp();
