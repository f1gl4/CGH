-- UUIDs in app

CREATE TABLE universe (
  id          UUID PRIMARY KEY,
  name        VARCHAR(120) NOT NULL,
  slug        VARCHAR(120) NOT NULL,
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);
CREATE UNIQUE INDEX IF NOT EXISTS ux_universe_slug ON universe(slug);

CREATE TABLE card_set (
  id           UUID PRIMARY KEY,
  code         VARCHAR(32)  NOT NULL,
  name         VARCHAR(160) NOT NULL,
  release_date DATE,
  universe_id  UUID         NOT NULL REFERENCES universe(id)
);
CREATE INDEX IF NOT EXISTS ix_card_set_universe ON card_set(universe_id);
CREATE UNIQUE INDEX IF NOT EXISTS ux_card_set_code ON card_set(code);

CREATE TABLE card (
  id           UUID PRIMARY KEY,
  name         VARCHAR(200) NOT NULL,
  rarity       VARCHAR(40),
  set_id       UUID NOT NULL REFERENCES card_set(id),
  universe_id  UUID NOT NULL REFERENCES universe(id),
  image_url    TEXT,
  attributes   JSONB        NOT NULL DEFAULT '{}'::jsonb,
  created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS ix_card_universe ON card(set_id, universe_id);
CREATE INDEX IF NOT EXISTS ix_card_name_trgm ON card USING GIN (name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS ix_card_attr_gin ON card USING GIN (attributes);
CREATE INDEX IF NOT EXISTS ix_card_attr_power ON card (((attributes->>'power')));

CREATE TABLE tag (
  id   UUID PRIMARY KEY,
  name VARCHAR(120) NOT NULL UNIQUE
);

CREATE TABLE card_tag (
  card_id UUID NOT NULL REFERENCES card(id) ON DELETE CASCADE,
  tag_id  UUID NOT NULL REFERENCES tag(id)  ON DELETE CASCADE,
  PRIMARY KEY (card_id, tag_id)
);

CREATE TABLE app_user (
  id             UUID PRIMARY KEY,
  email          VARCHAR(160) NOT NULL UNIQUE,
  nickname       VARCHAR(80)  NOT NULL UNIQUE,
  password_hash  VARCHAR(200) NOT NULL,
  created_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  version        INT          NOT NULL DEFAULT 0
);

CREATE TABLE owned_card (
  id        UUID PRIMARY KEY,
  user_id   UUID NOT NULL REFERENCES app_user(id) ON DELETE CASCADE,
  card_id   UUID NOT NULL REFERENCES card(id)     ON DELETE CASCADE,
  qty       INT  NOT NULL DEFAULT 0,
  condition VARCHAR(40),
  foil      BOOLEAN NOT NULL DEFAULT FALSE,
  note      TEXT,
  CONSTRAINT ux_owned UNIQUE (user_id, card_id),
  CONSTRAINT chk_owned_qty CHECK (qty >= 0)
);
CREATE INDEX IF NOT EXISTS ix_owned_user ON owned_card(user_id);

CREATE TABLE deck (
  id         UUID PRIMARY KEY,
  user_id    UUID NOT NULL REFERENCES app_user(id) ON DELETE CASCADE,
  name       VARCHAR(160) NOT NULL,
  format     VARCHAR(80),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE deck_card (
  deck_id UUID NOT NULL REFERENCES deck(id) ON DELETE CASCADE,
  card_id UUID NOT NULL REFERENCES card(id) ON DELETE CASCADE,
  copies  INT  NOT NULL DEFAULT 1,
  PRIMARY KEY (deck_id, card_id)
);

CREATE TABLE trade_offer (
  id         UUID PRIMARY KEY,
  owner_id   UUID NOT NULL REFERENCES app_user(id) ON DELETE CASCADE,
  status     VARCHAR(16) NOT NULL, -- OPEN, ACCEPTED, CANCELLED
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE trade_item (
  id       UUID PRIMARY KEY,
  offer_id UUID NOT NULL REFERENCES trade_offer(id) ON DELETE CASCADE,
  card_id  UUID NOT NULL REFERENCES card(id),
  qty      INT  NOT NULL,
  direction VARCHAR(8) NOT NULL -- GIVE, TAKE
);

CREATE TABLE audit_log (
  id        UUID PRIMARY KEY,
  user_id   UUID REFERENCES app_user(id),
  action    VARCHAR(80) NOT NULL,
  payload   JSONB       NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
