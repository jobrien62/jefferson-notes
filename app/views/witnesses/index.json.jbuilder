json.array!(@witnesses) do |witness|
  json.extract! witness, :author, :title, :publisher, :location, :year
  json.url witness_url(witness, format: :json)
end
