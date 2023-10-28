import { MongoClient, Db, Collection } from 'mongodb'
import { config } from 'dotenv'
import User from '~/models/schemas/User.shema'
config()
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@tweetprojectk18f2.nw6n5xg.mongodb.net/?retryWrites=true&w=majority`
class DatabaseService {
  private client: MongoClient
  private db: Db //tạo thành thuộc tình db
  constructor() {
    this.client = new MongoClient(uri)
    // nạp giá trị cho thuộc tình db thông qua constructor
    this.db = this.client.db(process.env.DB_NAME)
  }
  async connect() {
    try {
      await this.db.command({ ping: 1 }) //đổi cách xài
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.log('ahihi' + error)
      throw error
    }
  }
  get users(): Collection<User> {
    return this.db.collection(process.env.DB_USERS_COLLECTION as string)
  }
}

//từ class tạo object và export nó ra ngoài
const databaseService = new DatabaseService()
export default databaseService
