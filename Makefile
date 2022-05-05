.PHONY: deb clean build install

PACKAGE_ROOT = ./package-root

SYSTEMD_DIRECTORY = $(PACKAGE_ROOT)/usr/lib/systemd/system
# CONFIG_DIRECTORY = $(PACKAGE_ROOT)/etc/inventorius-landing-page
NGINX_CONFIG = $(PACKAGE_ROOT)/etc/nginx/conf.d
LIB_DIRECTORY = $(PACKAGE_ROOT)/usr/lib/inventorius-landing-page



clean:
	rm -r dist $(PACKAGE_ROOT) node_modules.prod.tar.gz

install_build_deps:
	npm ci

build:
	npm run build

install:
	sudo dpkg -i dist/inventorius-landing-page_0.1.0_all.deb

package_deps:
	rm -rf node_modules/
	npm ci --production
	tar -czvf node_modules.prod.tar.gz node_modules/
	rm -rf node_modules/

deb:
	mkdir -pv $(PACKAGE_ROOT)/DEBIAN
	cp -rv DEBIAN $(PACKAGE_ROOT)
	chmod +x $(PACKAGE_ROOT)/DEBIAN/postinst $(PACKAGE_ROOT)/DEBIAN/prerm

	mkdir -pv $(SYSTEMD_DIRECTORY)
	cp -v systemd/* $(SYSTEMD_DIRECTORY)

	# mkdir -pv $(CONFIG_DIRECTORY)
	# cp -v config/inventorius.conf $(CONFIG_DIRECTORY)

	mkdir -pv $(NGINX_CONFIG)
	cp -v $(wildcard config/pkg_*.conf) $(NGINX_CONFIG)

	mkdir -pv $(LIB_DIRECTORY)
	cp -vr .next $(LIB_DIRECTORY)
	tar -xzvf node_modules.prod.tar.gz -C $(LIB_DIRECTORY)

	mkdir dist
	dpkg-deb --build $(PACKAGE_ROOT)/ dist
