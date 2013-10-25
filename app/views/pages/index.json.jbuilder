json.array!(@pages) do |page|
  json.extract! page, :content, :page_number, :notes
  #json.url page_url(page, format: :json)
end
