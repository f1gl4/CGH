INSERT INTO universe (id, name, slug, created_at) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Fantasy', 'fantasy', NOW())
ON CONFLICT DO NOTHING;

INSERT INTO card_set (id, code, name, release_date, universe_id) VALUES
  ('22222222-2222-2222-2222-222222222222', 'FAN1', 'Fantasy Base', '2024-01-15', '11111111-1111-1111-1111-111111111111')
ON CONFLICT DO NOTHING;

INSERT INTO card (id, name, rarity, set_id, universe_id, image_url, attributes, created_at) VALUES
  ('33333333-3333-3333-3333-333333333331', 'Knight of Dawn', 'RARE',
   '22222222-2222-2222-2222-222222222222','11111111-1111-1111-1111-111111111111', NULL,
   '{"power":7,"toughness":5,"keywords":["first strike","human"]}', NOW()),
  ('33333333-3333-3333-3333-333333333332', 'Forest Sprite', 'COMMON',
   '22222222-2222-2222-2222-222222222222','11111111-1111-1111-1111-111111111111', NULL,
   '{"power":2,"toughness":1,"keywords":["flying","spirit"]}', NOW()),
  ('33333333-3333-3333-3333-333333333333', 'Arcane Scholar', 'UNCOMMON',
   '22222222-2222-2222-2222-222222222222','11111111-1111-1111-1111-111111111111', NULL,
   '{"power":3,"toughness":4,"keywords":["wizard"],"text":"Draw a card"}', NOW())
ON CONFLICT DO NOTHING;