import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

const logsDirectory = path.join(__dirname, '..', 'logs');
const logFilePath = path.join(logsDirectory, 'logger.txt');

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  
  const log = `userID:${req.body.userID},userRole:${req.body.userRoles}, userName:${req.body.userName},HTTP Method:${req.method}, URL: ${req.url}\n\n`;

  console.log(`userID:${req.body.userID},userRole:${req.body.userRoles}, userName:${req.body.userName},HTTP Method:${req.method}, URL: ${req.url}`);

  // Ensure the logs directory exists
  if (!fs.existsSync(logsDirectory)) {
    fs.mkdirSync(logsDirectory);
  }

  // Append the log to the logger.txt file
  fs.appendFile(logFilePath, log, (err) => {
    if (err) {
      console.error('Error writing log:', err);
    }
  });

  next();
};

export default loggerMiddleware;
