RailsAdmin.config do |config|

  # see https://github.com/sferik/rails_admin/wiki/Wysihtml5
  config.model Milestone do
    edit do
      field :content, :wysihtml5 do
        config_options :html => true
      end
    end
  end

  config.model 'User' do
    navigation_icon 'icon-user'
  end

  config.model 'Milestone' do
    navigation_icon 'icon-book'
    list do
      items_per_page 50
      sort_by :id
      field :id do
        sort_reverse false
      end
      field :title
      field :slug
    end

    edit do
      field :title do
        label "Title"
        help "The text of the original query"
      end

      field :content, :wysihtml5 do
        config_options('html' => true, 'font-styles' => false)
      end
    end


  end

  ### Popular gems integration

  ## == Devise ==
   config.authenticate_with do
     warden.authenticate! scope: :user
   end
   config.current_user_method(&:current_user)

  ## == Cancan ==
  #config.authorize_with :cancan

  ## == PaperTrail ==
  config.audit_with :paper_trail, 'User', 'PaperTrail::Version' # PaperTrail >= 3.0.0

  ### More at https://github.com/sferik/rails_admin/wiki/Base-configuration

  config.actions do
    dashboard                     # mandatory
    index                         # mandatory
    new
    export
    bulk_delete
    show
    edit
    delete
    show_in_app

    ## With an audit adapter, you can add:
    # history_index
    # history_show
  end
end
