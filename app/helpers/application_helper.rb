module ApplicationHelper

  FEDORA_PREFIX="http://fedoraproxy.lib.virginia.edu/fedora/objects"

  def fedora_url(pid, width=400, height=600)
    "#{FEDORA_PREFIX}/#{pid}/methods/djatoka:StaticSDef/getScaled?maxWidth=#{width}&maxHeight=#{height}"
  end

  def fedora_thumb(pid)
    "#{FEDORA_PREFIX}/#{pid}/methods/djatoka:StaticSDef/getThumbnail"
  end

  def fedora_squarethumb(pid, level=2, region='0.1,0.1,300,300')
      "#{FEDORA_PREFIX}/#{pid}/methods/djatoka:jp2SDef/getRegion?level=#{level}&region=#{region}"
  end

  def body_class
    [controller_name, action_name].join(' ')
  end

  def retina_image_tags(pid, alt="", width=400, height=600)
    default = fedora_url(pid, width, height)
    retina = fedora_url(pid, width * 2, height * 2)
    image_tag(default, :size => "#{width}x#{height}", :alt => alt, :data => { 'at2x' => retina })
  end

end
