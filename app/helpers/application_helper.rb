module ApplicationHelper

  def fedora_url(pid, width=400, height=600)
    "http://fedoraproxy.lib.virginia.edu/fedora/objects/#{pid}/methods/djatoka:StaticSDef/getScaled?maxWidth=#{width}&maxHeight=#{height}"
  end

  def fedora_thumb(pid)
    "http://fedoraproxy.lib.virginia.edu/fedora/objects/#{pid}/methods/djatoka:StaticSDef/getThumbnail"
  end

end
