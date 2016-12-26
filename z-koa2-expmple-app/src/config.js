import Collection from './collection';
import pageviews from '../config/collections/pageviews';
import postreads from '../config/collections/postreads';

let key = null;

try {
  key = require('../config/key');
} catch (error) {
  console.error('../config/key.json is not found. Please create it.');
}

export default {
  collections: {
    pageviews: new Collection(pageviews),
    postreads: new Collection(postreads),
  },
  cors: require('../config/cors'),
  key,
}
