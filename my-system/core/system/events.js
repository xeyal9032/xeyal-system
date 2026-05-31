import { EventEmitter } from 'events';

/**
 * Internal Event Bus
 * Centralized messaging system for all OS modules.
 */
class InternalEventBus extends EventEmitter {
    constructor() {
        super();
        this.setMaxListeners(50);
        this.history = [];
        this.maxHistory = 100;
    }

    /**
     * Specialized broadcast to ensure consistency
     */
    broadcast(event, category, payload = {}) {
        const message = {
            event,
            category,
            payload,
            timestamp: new Date().toISOString()
        };

        // Maintain history buffer
        this.history.push(message);
        if (this.history.length > this.maxHistory) this.history.shift();

        // Emit for listeners
        this.emit(event, message);
        
        // Also emit a general event for global monitoring
        this.emit('*', message);
    }

    getHistory() {
        return this.history;
    }
}

const bus = new InternalEventBus();
export default bus;
