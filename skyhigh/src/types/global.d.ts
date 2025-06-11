import mongoose from 'mongoose';

declare global {
  // Extend the NodeJS global object with mongoose caching
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

// Required to convert this file into a module
export {};
