---
title: Manjaro 相关备忘
date: '2023-04-28T02:57:07.569Z'
description: 本文记录一下关于 Manjaro 相关的备忘，以备不时之需。
---

## 1、下载 Manjaro KDE minimal

## 2、安装中先全部设置 en_US.UTF-8

## 3、GPT 分区

```
384M FAT32 /boot/efi
 16G linuxswap
128G ext4  /
325G ext4  /home
```

## 4、安装后

```bash
# 卸载不要的
sudo pacman -Rnus kdeconnect khelpcenter yakuake manjaro-hello vi nano nano-syntax-highlighting

# 安装需要的
sudo pacman -S fcitx5-im fcitx5-chinese-addons
sudo pacman -S vim filezilla base-devel yay
sudo pacman -S jdk17-openjdk dbeaver kdesvn trojan
sudo pacman -S noto-fonts-cjk noto-fonts-emoji ttf-liberation adobe-source-han-serif-cn-fonts

# 安装 AUR 的软件
yay -S google-chrome
yay -S visual-studio-code-bin
yay -S noto-fonts-sc
yay -S lib32-udis86-git
yay -S deepin-wine-helper
yay -S deepin-wine6-stable

# https://github.com/vufa/deepin-wine-wechat-arch/releases/tag/v3.8.1.26-1
yay -S deepin-wine-wechat
```

## 5、locale (语言设置)

编辑 /etc/locale.gen

```bash
vim /etc/locale.gen
---------------------

# 去注释掉这两行
en_US.UTF-8 UTF-8
zh_CN.UTF-8 UTF-8

# 重新生成 Locale
locale-gen

# 设置可输入中文的英文环境
echo LANG=en_US.UTF-8 > /etc/locale.conf
echo LC_CTYPE=zh_CN.UTF-8 >> /etc/locale.conf
```

> 此处是需要设置一个可以输入中文的英文环境 <br />
> 关于 `locale` 的设置可以参考 [locale 的设定及 LANG、LC_CTYPE、LC_ALL 环境变量](https://www.cnblogs.com/xlmeng1988/archive/2013/01/16/locale.html)

fcitx 需要这只环境变量

```bash
sudo vim /etc/environment

# 只用设置最后一个，Wayland 下用设置里边选择 fcitx 启动输入法，https://fcitx-im.org/wiki/Using_Fcitx_5_on_Wayland#KDE_Plasma
# GTK_IM_MODULE=fcitx
# QT_IM_MODULE=fcitx
XMODIFIERS=@im=fcitx
```

## 重启
