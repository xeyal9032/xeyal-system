-- Xeyal Cloud Database Schema (PostgreSQL)

-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- API Keys Table
CREATE TABLE api_keys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    key_hash TEXT NOT NULL UNIQUE,
    key_prefix VARCHAR(8) NOT NULL,
    name VARCHAR(255) DEFAULT 'Default Key',
    is_active BOOLEAN DEFAULT TRUE,
    last_used_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Errors Table
CREATE TABLE errors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    api_key_id UUID REFERENCES api_keys(id) ON DELETE CASCADE,
    project_name VARCHAR(255),
    error_message TEXT NOT NULL,
    stack_trace TEXT,
    severity VARCHAR(20) DEFAULT 'ERROR',
    language VARCHAR(50),
    environment JSONB, -- OS, Node version, etc.
    grouping_id VARCHAR(255), -- For deduplication
    metadata JSONB DEFAULT '{}', -- Breadcrumbs, user context, tags
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Analyses Table
CREATE TABLE analyses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    error_id UUID REFERENCES errors(id) ON DELETE CASCADE,
    reason TEXT,
    explanation TEXT,
    fix_suggestion TEXT,
    example_code TEXT,
    confidence NUMERIC(3,2),
    ai_model VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Usage Logs Table (For Rate Limiting & Analytics)
CREATE TABLE usage_logs (
    id BIGSERIAL PRIMARY KEY,
    api_key_id UUID REFERENCES api_keys(id) ON DELETE CASCADE,
    endpoint VARCHAR(255),
    status_code INTEGER,
    response_time_ms INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_errors_api_key ON errors(api_key_id);
CREATE INDEX idx_errors_grouping ON errors(grouping_id);
CREATE INDEX idx_api_keys_hash ON api_keys(key_hash);
