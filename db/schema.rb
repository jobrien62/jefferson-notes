# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20131121193559) do

  create_table "friendly_id_slugs", force: true do |t|
    t.string   "slug",                      null: false
    t.integer  "sluggable_id",              null: false
    t.string   "sluggable_type", limit: 50
    t.string   "scope"
    t.datetime "created_at"
  end

  add_index "friendly_id_slugs", ["slug", "sluggable_type", "scope"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope", unique: true
  add_index "friendly_id_slugs", ["slug", "sluggable_type"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type"
  add_index "friendly_id_slugs", ["sluggable_id"], name: "index_friendly_id_slugs_on_sluggable_id"
  add_index "friendly_id_slugs", ["sluggable_type"], name: "index_friendly_id_slugs_on_sluggable_type"

  create_table "images", force: true do |t|
    t.string   "filename"
    t.string   "pid"
    t.integer  "witness_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "images", ["witness_id"], name: "index_images_on_witness_id"

  create_table "images_pages", force: true do |t|
    t.integer  "page_id"
    t.integer  "image_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "images_pages", ["image_id"], name: "index_images_pages_on_image_id"
  add_index "images_pages", ["page_id"], name: "index_images_pages_on_page_id"

  create_table "page_images", force: true do |t|
    t.integer "page_id"
    t.integer "image_id"
  end

  create_table "pages", force: true do |t|
    t.text     "content"
    t.integer  "page_number"
    t.text     "notes"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "witness_id"
    t.string   "slug"
    t.integer  "order"
  end

  add_index "pages", ["slug"], name: "index_pages_on_slug", unique: true
  add_index "pages", ["witness_id"], name: "index_pages_on_witness_id"

  create_table "pages_images", force: true do |t|
    t.integer  "page_id"
    t.integer  "image_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "pages_images", ["image_id"], name: "index_pages_images_on_image_id"
  add_index "pages_images", ["page_id"], name: "index_pages_images_on_page_id"

  create_table "witnesses", force: true do |t|
    t.string   "author"
    t.string   "title"
    t.string   "publisher"
    t.string   "location"
    t.integer  "year"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "slug"
  end

  add_index "witnesses", ["slug"], name: "index_witnesses_on_slug", unique: true

end
