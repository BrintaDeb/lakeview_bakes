import fs from "fs/promises";
import path from "path";
import { Order, UserProfile } from "@/types";

const DB_DIR = path.join(process.cwd(), "src", "data", "db");
const USERS_FILE = path.join(DB_DIR, "users.json");
const ORDERS_FILE = path.join(DB_DIR, "orders.json");

// Ensure DB directory and files exist
async function ensureDb() {
  try {
    await fs.mkdir(DB_DIR, { recursive: true });
    try {
      await fs.access(USERS_FILE);
    } catch {
      await fs.writeFile(USERS_FILE, JSON.stringify([], null, 2), "utf-8");
    }
    try {
      await fs.access(ORDERS_FILE);
    } catch {
      // Seed with initial authentic sample history if empty
      const initialOrders: Order[] = [
        {
          id: "ORD-LAKEVIEW-193001",
          orderNumber: "ORD-LAKEVIEW-193001",
          date: "18 Nov 2026",
          createdAt: Date.now() - 3 * 86400000,
          customerName: "Priya Sundaram",
          email: "priya.s@example.com",
          phone: "9876543210",
          address: "Flat 304, Palm Grove, 100ft Road, Indiranagar",
          city: "Bengaluru",
          postalCode: "560038",
          items: [
            {
              id: "item-1",
              productId: 9901,
              variantId: 99011,
              title: "The 1930 Banana Split Sundae",
              variantTitle: "Standard Twin Boat",
              price: 320,
              quantity: 2,
              image: "/assets/products/classic-banana-split.jpg",
              size: "Standard Twin Boat",
              eggless: true,
            },
            {
              id: "item-2",
              productId: "chocolate-truffle",
              variantId: "var-1",
              title: "Belgian Chocolate Truffle Cake",
              variantTitle: "1 kg",
              price: 1400,
              quantity: 1,
              image: "/assets/products/belgian-truffle-cake.jpg",
              size: "1 kg",
              eggless: true,
              messageOnCake: "Happy 25th Birthday Rhea!",
            },
          ],
          subtotal: 2040,
          deliveryFee: 0,
          discount: 150,
          total: 1890,
          paymentMethod: "UPI (Google Pay)",
          paymentStatus: "paid",
          orderStatus: "Delivered",
          deliveryDate: "18 Nov 2026",
          deliveryTimeSlot: "Evening (4:00 PM – 8:00 PM)",
          notes: "Call upon arrival at apartment gate.",
        },
      ];
      await fs.writeFile(ORDERS_FILE, JSON.stringify(initialOrders, null, 2), "utf-8");
    }
  } catch (err) {
    console.error("Database initialization error:", err);
  }
}

// In-Memory fallback / cache for fast access
class DatabaseService {
  private initialized = false;

  private async init() {
    if (!this.initialized) {
      await ensureDb();
      this.initialized = true;
    }
  }

  // --- USER OPERATIONS ---
  async getUsers(): Promise<UserProfile[]> {
    await this.init();
    try {
      const data = await fs.readFile(USERS_FILE, "utf-8");
      return JSON.parse(data || "[]");
    } catch {
      return [];
    }
  }

  async findUserByPhone(phone: string): Promise<UserProfile | null> {
    const cleanPhone = phone.replace(/\D/g, "").slice(-10);
    const users = await this.getUsers();
    return (
      users.find((u) => u.phone.replace(/\D/g, "").slice(-10) === cleanPhone) ||
      null
    );
  }

  async saveUser(user: UserProfile): Promise<UserProfile> {
    await this.init();
    const users = await this.getUsers();
    const cleanPhone = user.phone.replace(/\D/g, "").slice(-10);

    const index = users.findIndex(
      (u) => u.phone.replace(/\D/g, "").slice(-10) === cleanPhone
    );

    if (index >= 0) {
      users[index] = { ...users[index], ...user };
    } else {
      users.push(user);
    }

    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
    return user;
  }

  // --- ORDER OPERATIONS ---
  async getOrders(): Promise<Order[]> {
    await this.init();
    try {
      const data = await fs.readFile(ORDERS_FILE, "utf-8");
      return JSON.parse(data || "[]");
    } catch {
      return [];
    }
  }

  async getOrderById(orderId: string): Promise<Order | null> {
    const orders = await this.getOrders();
    return orders.find((o) => o.id === orderId || o.orderNumber === orderId) || null;
  }

  async getOrdersByPhone(phone: string): Promise<Order[]> {
    const cleanPhone = phone.replace(/\D/g, "").slice(-10);
    const orders = await this.getOrders();
    return orders.filter(
      (o) => o.phone && o.phone.replace(/\D/g, "").slice(-10) === cleanPhone
    );
  }

  async saveOrder(order: Order): Promise<Order> {
    await this.init();
    const orders = await this.getOrders();
    const index = orders.findIndex((o) => o.id === order.id);

    if (index >= 0) {
      orders[index] = order;
    } else {
      orders.unshift(order);
    }

    await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf-8");
    return order;
  }

  async updateOrderStatus(
    orderId: string,
    status: Order["orderStatus"]
  ): Promise<Order | null> {
    await this.init();
    const orders = await this.getOrders();
    const order = orders.find((o) => o.id === orderId);

    if (!order) return null;

    order.orderStatus = status;
    await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf-8");
    return order;
  }
}

export const db = new DatabaseService();
