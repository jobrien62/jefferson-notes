module ApplicationHelper

  FEDORA_PREFIX="http://fedoraproxy.lib.virginia.edu/fedora/objects"

  def fedora_thumb(pid)
    "#{FEDORA_PREFIX}/#{pid}/methods/djatoka:StaticSDef/getThumbnail"
  end

  def body_class
    [controller_name, action_name].join(' ')
  end

end
