import test from 'ava'
import AV from '../../src/js/common/AV'

let Post = ()=> {
  return AV.extend('post')
}

/*test(t=> { 
  let Post = AV.extend('post')
  t.deepEqual(Post.order('-id').query, ["order=-id"])
  t.deepEqual(Post.limit(10).query, ["order=-id", "limit=10"])
})*/

/*test(t=> {
  t.deepEqual(Post().or({id: 1}).or({mem: 2}).whereRex, {id: 1})
  t.deepEqual(Post().where(["id > ?", 1]).whereRex, {id: {'$gt': 1}})
  t.deepEqual(Post().where(["id > ? and age < 10", 1]).whereRex, {id: {'$gt': 1}, age: {'$lt': 10}})
  t.deepEqual(Post().where(["id > ? and age < ?", 1]).whereRex, {id: {'$gt': 1}, age: {'$lt': 1}})
  t.deepEqual(Post().where(["id > ? and age < ?", 1, 2, 3]).whereRex, {id: {'$gt': 1}, age: {'$lt': 2}})
  t.deepEqual(Post().where(["id > ? or age < ?", 1, 2]).whereRex, {'$or': [{id: {'$gt': 1}}, {age: {'$lt': 2}}]})
})*/

/*test(t=> {
  return Post().where({id: 1}).all().then((data)=> {
    t.deepEqual(data, 'where={\"id\":1}')
  })
})
*/
test(t=> {
  t.deepEqual(Post().include('user').test(), {'user': '*'})
  t.deepEqual(Post().include({'user': 'id,name'}).test(), {'user': 'id,name'})
  t.deepEqual(Post().include({'user': 'id,name', 'mem': '*'}).test(), {'user': 'id,name', 'mem': '*'})
})
