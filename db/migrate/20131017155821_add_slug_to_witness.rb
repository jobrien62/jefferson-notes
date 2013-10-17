class AddSlugToWitness < ActiveRecord::Migration
  def change
    add_column :witnesses, :slug, :string, :unique => true
    add_index :witnesses, :slug,  :unique => true
  end

end
