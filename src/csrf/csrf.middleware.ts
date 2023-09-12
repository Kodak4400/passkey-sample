import { Injectable, NestMiddleware } from '@nestjs/common';
import { csrfSync } from 'csrf-sync';

@Injectable()
export class CsrfMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const method = req.method;

    if (method === 'GET') {
      // const csrfToken = crypto.randomBytes(20).toString('hex');
      const csrfToken = csrfSync().generateToken(req, true);
      req.session.csrfToken = csrfToken;
      res.locals = {
        csrfToken: csrfToken,
      };
    } else if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
      if (req.body._token !== req.session.csrfToken) {
        return res.status(419).send('Page Expired');
      }
    }
    next();
  }
}
