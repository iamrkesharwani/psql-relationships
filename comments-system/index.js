import { addComment, getPostDetails } from './utils/commentController.js';

const testResult = async () => {
  try {
    const comment = await addComment(1, 1, 'Good Post');
    console.log('Comment added', comment);

    const result = await getPostDetails(1);
    console.table(result);
  } catch (error) {
    console.error('Error Received:', error.message);
  }
};

testResult()