import { 
  users, bots, posts, activities, comments,
  type User, type InsertUser, type Bot, type InsertBot,
  type Post, type InsertPost, type Activity, type InsertActivity,
  type Comment, type InsertComment
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Bot methods
  getBots(userId: number): Promise<Bot[]>;
  getBot(id: number): Promise<Bot | undefined>;
  createBot(bot: InsertBot): Promise<Bot>;
  updateBot(id: number, updates: Partial<Bot>): Promise<Bot | undefined>;
  deleteBot(id: number): Promise<boolean>;
  
  // Post methods
  getPosts(limit?: number): Promise<Post[]>;
  getPost(id: number): Promise<Post | undefined>;
  createPost(post: InsertPost): Promise<Post>;
  updatePost(id: number, updates: Partial<Post>): Promise<Post | undefined>;
  
  // Activity methods
  getActivities(botId?: number, limit?: number): Promise<Activity[]>;
  createActivity(activity: InsertActivity): Promise<Activity>;
  
  // Comment methods
  getComments(postId: number): Promise<Comment[]>;
  createComment(comment: InsertComment): Promise<Comment>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private bots: Map<number, Bot>;
  private posts: Map<number, Post>;
  private activities: Map<number, Activity>;
  private comments: Map<number, Comment>;
  private currentUserId: number;
  private currentBotId: number;
  private currentPostId: number;
  private currentActivityId: number;
  private currentCommentId: number;

  constructor() {
    this.users = new Map();
    this.bots = new Map();
    this.posts = new Map();
    this.activities = new Map();
    this.comments = new Map();
    this.currentUserId = 1;
    this.currentBotId = 1;
    this.currentPostId = 1;
    this.currentActivityId = 1;
    this.currentCommentId = 1;
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Create sample user
    const user: User = {
      id: this.currentUserId++,
      username: "learninguser",
      password: "password123"
    };
    this.users.set(user.id, user);

    // Create sample bots
    const contentBot: Bot = {
      id: this.currentBotId++,
      name: "Content Creator Bot",
      type: "content_creator",
      description: "Automatically creates and posts engaging content",
      userId: user.id,
      isActive: true,
      config: {
        activityLevel: 5,
        keywords: ["automation", "productivity", "AI"],
        schedule: { start: "09:00", end: "17:00" },
        respectLimits: true
      },
      stats: {
        postsCount: 24,
        engagementRate: 85,
        totalInteractions: 156
      },
      createdAt: new Date()
    };
    this.bots.set(contentBot.id, contentBot);

    const engagementBot: Bot = {
      id: this.currentBotId++,
      name: "Engagement Bot",
      type: "engagement",
      description: "Likes and comments on relevant posts",
      userId: user.id,
      isActive: true,
      config: {
        activityLevel: 7,
        keywords: ["tech", "startup", "innovation"],
        schedule: { start: "08:00", end: "20:00" },
        respectLimits: true
      },
      stats: {
        likesCount: 156,
        commentsCount: 43,
        totalInteractions: 199
      },
      createdAt: new Date()
    };
    this.bots.set(engagementBot.id, engagementBot);

    const followerBot: Bot = {
      id: this.currentBotId++,
      name: "Follower Bot",
      type: "follower",
      description: "Follows accounts based on targeting criteria",
      userId: user.id,
      isActive: false,
      config: {
        activityLevel: 3,
        keywords: ["business", "entrepreneur"],
        schedule: { start: "10:00", end: "16:00" },
        respectLimits: true
      },
      stats: {
        followsCount: 89,
        successRate: 92,
        totalInteractions: 89
      },
      createdAt: new Date()
    };
    this.bots.set(followerBot.id, followerBot);

    // Create sample posts
    const posts = [
      {
        id: this.currentPostId++,
        content: "Just launched our new productivity app! 🚀 Automation is the future of business efficiency. What's your favorite tool for streamlining workflows? #productivity #automation #startup",
        author: "TechStartupGuru",
        authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        isFromBot: true,
        botId: contentBot.id,
        likes: 23,
        comments: 7,
        shares: 3,
        createdAt: new Date(Date.now() - 2 * 60 * 1000)
      },
      {
        id: this.currentPostId++,
        content: "The power of social media automation is incredible! Our engagement rates have tripled since implementing smart bot strategies. Here's what we learned... 🧵",
        author: "MarketingMaven",
        authorAvatar: null,
        isFromBot: false,
        botId: null,
        likes: 45,
        comments: 12,
        shares: 8,
        createdAt: new Date(Date.now() - 5 * 60 * 1000)
      },
      {
        id: this.currentPostId++,
        content: "Building ethical AI systems requires careful consideration of user privacy and transparency. How do you ensure your automation respects user boundaries? #AI #ethics #automation",
        author: "DigitalInnovator",
        authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        isFromBot: false,
        botId: null,
        likes: 31,
        comments: 15,
        shares: 6,
        createdAt: new Date(Date.now() - 8 * 60 * 1000)
      }
    ];

    posts.forEach(post => this.posts.set(post.id, post));

    // Create sample activities
    const activities = [
      {
        id: this.currentActivityId++,
        botId: contentBot.id,
        type: "post",
        description: "Content Creator Bot posted new content",
        targetPostId: posts[0].id,
        createdAt: new Date(Date.now() - 2 * 60 * 1000)
      },
      {
        id: this.currentActivityId++,
        botId: engagementBot.id,
        type: "like",
        description: "Engagement Bot liked 3 posts",
        targetPostId: posts[1].id,
        createdAt: new Date(Date.now() - 5 * 60 * 1000)
      },
      {
        id: this.currentActivityId++,
        botId: followerBot.id,
        type: "pause",
        description: "Follower Bot paused due to limit",
        targetPostId: null,
        createdAt: new Date(Date.now() - 8 * 60 * 1000)
      }
    ];

    activities.forEach(activity => this.activities.set(activity.id, activity));

    // Create sample comment
    const comment: Comment = {
      id: this.currentCommentId++,
      postId: posts[0].id,
      content: "Great insights! We've been using similar automation tools and they've boosted our team productivity by 40%. Would love to try your app!",
      author: "Engagement Bot",
      isFromBot: true,
      botId: engagementBot.id,
      createdAt: new Date(Date.now() - 1 * 60 * 1000)
    };
    this.comments.set(comment.id, comment);
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getBots(userId: number): Promise<Bot[]> {
    return Array.from(this.bots.values()).filter(bot => bot.userId === userId);
  }

  async getBot(id: number): Promise<Bot | undefined> {
    return this.bots.get(id);
  }

  async createBot(insertBot: InsertBot): Promise<Bot> {
    const id = this.currentBotId++;
    const bot: Bot = { 
      ...insertBot, 
      id, 
      createdAt: new Date(),
      isActive: insertBot.isActive ?? true,
      stats: { postsCount: 0, engagementRate: 0, totalInteractions: 0 }
    };
    this.bots.set(id, bot);
    return bot;
  }

  async updateBot(id: number, updates: Partial<Bot>): Promise<Bot | undefined> {
    const bot = this.bots.get(id);
    if (!bot) return undefined;
    
    const updatedBot = { ...bot, ...updates };
    this.bots.set(id, updatedBot);
    return updatedBot;
  }

  async deleteBot(id: number): Promise<boolean> {
    return this.bots.delete(id);
  }

  async getPosts(limit: number = 50): Promise<Post[]> {
    return Array.from(this.posts.values())
      .sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime())
      .slice(0, limit);
  }

  async getPost(id: number): Promise<Post | undefined> {
    return this.posts.get(id);
  }

  async createPost(insertPost: InsertPost): Promise<Post> {
    const id = this.currentPostId++;
    const post: Post = { 
      ...insertPost, 
      id, 
      createdAt: new Date(),
      authorAvatar: insertPost.authorAvatar ?? null,
      isFromBot: insertPost.isFromBot ?? false,
      botId: insertPost.botId ?? null,
      likes: insertPost.likes ?? 0,
      comments: insertPost.comments ?? 0,
      shares: insertPost.shares ?? 0
    };
    this.posts.set(id, post);
    return post;
  }

  async updatePost(id: number, updates: Partial<Post>): Promise<Post | undefined> {
    const post = this.posts.get(id);
    if (!post) return undefined;
    
    const updatedPost = { ...post, ...updates };
    this.posts.set(id, updatedPost);
    return updatedPost;
  }

  async getActivities(botId?: number, limit: number = 50): Promise<Activity[]> {
    let activities = Array.from(this.activities.values());
    
    if (botId) {
      activities = activities.filter(activity => activity.botId === botId);
    }
    
    return activities
      .sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime())
      .slice(0, limit);
  }

  async createActivity(insertActivity: InsertActivity): Promise<Activity> {
    const id = this.currentActivityId++;
    const activity: Activity = { 
      ...insertActivity, 
      id, 
      createdAt: new Date(),
      targetPostId: insertActivity.targetPostId ?? null
    };
    this.activities.set(id, activity);
    return activity;
  }

  async getComments(postId: number): Promise<Comment[]> {
    return Array.from(this.comments.values())
      .filter(comment => comment.postId === postId)
      .sort((a, b) => a.createdAt!.getTime() - b.createdAt!.getTime());
  }

  async createComment(insertComment: InsertComment): Promise<Comment> {
    const id = this.currentCommentId++;
    const comment: Comment = { 
      ...insertComment, 
      id, 
      createdAt: new Date(),
      isFromBot: insertComment.isFromBot ?? false,
      botId: insertComment.botId ?? null
    };
    this.comments.set(id, comment);
    return comment;
  }
}

export const storage = new MemStorage();
