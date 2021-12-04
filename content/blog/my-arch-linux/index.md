---
title: 我的 Arch Linux
date: '2021-12-03T10:20:30.843Z'
description:
  都说好记性，不如烂笔头。<br /> 本文记录一下 Arch Linux 的基本安装步骤以及一些配置啥儿的，
  以备不时之需。
---

## 1、准备新分区

> `UEFI + GPT` 分区方案 <br />
> 384M 的 ESP 分区 `/boot` 分区类型为 ef00 <br />
> LVM on LUKS (剩余的是全部分给 LVM) 分区类型为 8e00 <br />
> 32G 根分区 / <br />
> 16G 交换分区 swap <br />
> 剩余的全部给 /home 分区

```bash
gdisk /dev/sda

mkfs.fat -F 32 /dev/sda1
fatlabel /dev/sda1 ESP

cryptsetup luksFormat /dev/sda2
cryptsetup open /dev/sda2 archlvm # archlvm 可随意，使用时保持一致即可

pvcreate /dev/mapper/archlvm
vgcreate ArchGroup /dev/mapper/archlvm # ArchGroup 可随意，使用时保持一致即可
lvcreate -L 30G ArchGroup -n root
lvcreate -L 16G ArchGroup -n swap
lvcreate -l 100%FREE ArchGroup -n home

# `-L ROOR`、`-L HOME`、`-L SWAP` 标卷名可随意
mkfs.ext4 -L ROOT /dev/mapper/ArchGroup-root
mkfs.ext4 -L HOME /dev/mapper/ArchGroup-home
mkswap -L SWAP /dev/mapper/ArchGroup-swap

mount /dev/mapper/ArchGroup-root /mnt
mkdir /mnt/home /mnt/boot

mount dev/mapper/ArchGroup-home /mnt/home
mount /dev/sda1 /mnt/boot
swapon /dev/mapper/ArchGroup-swap
```

## 2、选择镜像源

> 通过 reflector 选择中国镜像源

```bash
reflector -c CN --save /etc/pacman.d/mirrorlist
```

## 3、安装系统

查看一下电脑中的显卡类型，这里有 intel, Nvidia 两个

```
[root@arch ~]# lspci -v | grep -A1 -e VGA -e 3D
00:02.0 VGA compatible controller: Intel Corporation UHD Graphics 620 (rev 07) (prog-if 00 [VGA controller])
        Subsystem: Xiaomi Device 1701
--
01:00.0 3D controller: NVIDIA Corporation GP108M [GeForce MX150] (rev a1)
        Subsystem: Xiaomi Mi Notebook Pro [GeForce MX150]
```

安装基础系统和需要的包

```bash
pacstrap -i /mnt \
base base-devel linux linux-firmware bash-completion grub dosfstools efibootmgr lvm2 \
bluez-utils pulseaudio-bluetooth xdg-user-dir vim git curl openssh  \
xf86-video-intel xf86-video-nouveau xf86-input-libinput \
plasma konsole dolphin ark kate okular gwenview networkmanager exfat-utils ntfs-3g \
fcitx fcitx-im fcitx-configtool \
ttf-dejavu ttf-liberation \
adobe-source-code-pro-fonts \
adobe-source-sans-pro-fonts \
adobe-source-serif-pro-fonts \
adobe-source-han-sans-cn-fonts \
adobe-source-han-sans-otc-fonts \
adobe-source-han-sans-tw-fonts \
adobe-source-han-serif-cn-fonts \
adobe-source-han-serif-otc-fonts \
adobe-source-han-serif-tw-fonts
```

## 4、生成 fstab 文件

```bash
genfstab -U -p /mnt >> /mnt/etc/fstab
```

## 5、配置系统

首先，进入 chroot 环境

```bash
arch-chroot /mnt
```

### a. locale (语言设置)

编辑 /etc/locale.gen

```bash
vim /etc/locale.gen

# 去注释掉这两行
en_US.UTF-8 UTF-8
zh_CN.UTF-8 UTF-8

# 重新生成 Locale
locale-gen

export LANG=en_US.UTF-8

# 设置可输入中文的英文环境
echo LANG=en_US.UTF-8 > /etc/locale.conf
echo LC_CTYPE=zh_CN.UTF-8 >> /etc/locale.conf
```

> 此处是需要设置一个可以输入中文的英文环境 <br />
> 关于 `locale` 的设置可以参考 [locale 的设定及 LANG、LC_CTYPE、LC_ALL 环境变量](https://www.cnblogs.com/xlmeng1988/archive/2013/01/16/locale.html)

### b. timezone (时区设置)

```bash
# 如果已经存在 /etc/localtime，创建链接会报错，先删除即可
rm /etc/localtime
ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```

### c. hostname (主机名设置)

```bash
echo arch > /etc/hostname # arch 可随意，设置喜欢的名字即可
```

### d. network (使用 `networkmanager` 管理网络连接)

```bash
systemctl enable NetworkManager
```

### e. 用户 (设置 `root` 密码和添加普通用户)

```bash
passwd root # 设置 root 密码
useradd -mG wheel ghlandy # 添加 ghlandy 用户，并将其加入 wheel 组
passwd ghlandy
```

### f. grub

mkinitcpio.conf

```bash
# 编辑 /etc/mkinitcpio.conf
vim /etc/mkinitcpio.conf

# 添加 keyboard keymap encrypt lvm2
HOOKS=(base udev autodetect keyboard keymap consolefont modconf block encrypt lvm2 filesystems fsck)

mkinitcpio -P
```

```bash
# 编辑 /etc/default/grub
vim /etc/default/grub

# 查看加密分区的 UUID
blkid

# 添加并替换 device-UUID
GRUB_CMDLINE_LINUX="cryptdevice=UUID=device-UUID:archlvm root=/dev/ArchGroup/root"
```

grub 安装及启动菜单

```bash
grub-install --target=x86_64-efi --efi-directory=/boot \
--bootloader-id="Arch Linux Grub Bootloader" --recheck --debug

# 下载 grub 主题
git clone https://github.com/gustawho/grub2-theme-breeze.git
cp -r grub2-theme-breeze/breeze /boot/grub/themes
vim /etc/default/grub
# 设置 grub 主题
GRUB_THEME="/boot/grub/themes/breeze/theme.txt"

# 生成 grub 启动菜单
grub-mkconfig -o /boot/grub/grub.cfg
```

`--efi-directory` 指向 EFI 分区挂载的位置，前面我们挂载到 `/boot`，`--bootloader-id` 是在进入 `BIOS`
时显示的名称，这里设置为 `Arch Linux Grub Bootloader`。

### g. 设置输入法 (fcitx)

比如我们待会儿用 `ghlandy` 用户登录到桌面环境，则需要在该用户家目录下建立 `.pam_environment`，并输入一下内容：

```bash
touch /home/ghlandy/.pam_environment
chown ghlandy:ghlandy /home/ghlandy/.pam_environment
vim /home/ghlandy/.pam_environment

GTK_IM_MODULE=fcitx
QT_IM_MODULE=fcitx
XMODIFIERS=@im=fictx
```

### h. 桌面环境 Plasma

```bash
# 启用 sddm breeze 主题
cp -r /usr/lib/sddm/sddm.conf.d /etc
vim /etc/sddm.conf.d/default.conf

[Theme]
Current=breeze

# 开机启动 sddm
systemctl enbale sddm
```

## 7、重启

退出 chroot 并重启

```bash
exit
reboot
```
