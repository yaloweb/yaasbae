<?php
use Bitrix\Main\Page\Asset;
use Bitrix\Main\Page\AssetLocation;
use Bik\Project\Tools;
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) {
    die();
}
$isIndex = ($APPLICATION->GetCurDir() == SITE_DIR);
$isDynamic = ($APPLICATION->GetProperty('dynamic_page') == 'y') || $isIndex;
?><!DOCTYPE html>
<html lang="ru">
<head>
    <title><? $APPLICATION->ShowTitle(); ?></title>
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

	<!-- Template Basic Images Start -->
    <?/*
	<meta property="og:image" content="path/to/image.jpg">
    */?>
	<link rel="icon" href="<?= SITE_TEMPLATE_PATH ?>/img/favicon/favicon.ico">
	<link rel="apple-touch-icon" sizes="180x180" href="<?= SITE_TEMPLATE_PATH ?>/img/favicon/apple-touch-icon-180x180.png">
	<!-- Template Basic Images End -->
	
	<!-- Custom Browsers Color Start -->
	<meta name="theme-color" content="#000">
	<!-- Custom Browsers Color End -->

    <?
    $APPLICATION->ShowHead();
    $asset = Asset::getInstance();

    $asset->addCss(SITE_TEMPLATE_PATH . '/css/main.min.css');

    $asset->addJs(SITE_TEMPLATE_PATH . '/js/scripts.min.js');
    $asset->addJs(SITE_TEMPLATE_PATH . '/js/jquery.history.js');
    $asset->addJs(SITE_TEMPLATE_PATH . '/js/common.js');
    $asset->addJs(SITE_TEMPLATE_PATH . '/js/backend.js');
    ?>

    <? $APPLICATION->IncludeFile(
        '/include/counters.php',
        Array(),
        Array('MODE' => 'php')
    ); ?>

    <meta name="facebook-domain-verification" content="jmmkc0plge54orrg5jv0geuy6bxt1a" />
</head>

<body>
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KFVXQWM" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
    <? $APPLICATION->ShowPanel(); ?>
	<div class="wrapper">

		<div class="mob-menu-block">
			<div class="mob-menu">
				<div class="mob-menu-header">
					<div class="mob-menu-close"><span class="icon-close-2"></span></div>
					<div class="mob-menu-logo">
						<a<? if (!$isIndex) { ?> href="<?= SITE_DIR ?>"<? } ?> class="logo">
							<img src="<?= SITE_TEMPLATE_PATH ?>/img/logo.svg" alt="">
						</a>
					</div>
				</div>


                <?$APPLICATION->IncludeComponent("bitrix:menu", "main_mobile", array(
                        "ROOT_MENU_TYPE" => "main",
                        "MENU_CACHE_TYPE" => "A",
                        "MENU_CACHE_TIME" => "36000",
                        "MENU_CACHE_USE_GROUPS" => "N",
                        "MENU_THEME" => "",
                        "CACHE_SELECTED_ITEMS" => "N",
                        "MENU_CACHE_GET_VARS" => array(),
                        "MAX_LEVEL" => "1",
                        "CHILD_MENU_TYPE" => "",
                        "USE_EXT" => "N",
                        "DELAY" => "N",
                        "ALLOW_MULTI_SELECT" => "N",
                    ),
                    false
                );?>

				<div class="mob-menu-soc">
					<a href="#" class="footer-soc-item">
						<span class="footer-soc-icon icon-instagram"></span>
						<span class="footer-soc-name">@yassbae</span>
						<span class="footer-soc-arrow icon-arrow-right-2"></span>
					</a>
				</div>

				<div class="mob-menu-accordion">

					<div class="mob-menu-accordion-item">
						<div class="mob-menu-accordion-title">Информация</div>
						<div class="mob-menu-accordion-body">
                            <?$APPLICATION->IncludeComponent("bitrix:menu", "mobile_footer_links", array(
                                    "ROOT_MENU_TYPE" => "info",
                                    "MENU_CACHE_TYPE" => "A",
                                    "MENU_CACHE_TIME" => "36000",
                                    "MENU_CACHE_USE_GROUPS" => "N",
                                    "MENU_THEME" => "",
                                    "CACHE_SELECTED_ITEMS" => "N",
                                    "MENU_CACHE_GET_VARS" => array(),
                                    "MAX_LEVEL" => "1",
                                    "CHILD_MENU_TYPE" => "",
                                    "USE_EXT" => "N",
                                    "DELAY" => "N",
                                    "ALLOW_MULTI_SELECT" => "N",
                                ),
                                false
                            );?>
						</div>
					</div>

                    <?/*
					<div class="mob-menu-accordion-item">
						<div class="mob-menu-accordion-title">Возврат и доставка</div>
						<div class="mob-menu-accordion-body">
							<nav class="mob-menu-footer-links">
								<a href="#">Помощь</a>
								<a href="#">Как оформить заказ</a>
								<a href="#">Как выбрать размер</a>
								<a href="#">Условия доставки</a>
								<a href="#">Мои заказы</a>
								<a href="#">Бонусы и скидки</a>
								<a href="#">Возврат</a>
							</nav>
						</div>
					</div>
                    */?>
				</div>
			</div>
		</div>

		<header class="site-header dark" style="background-color: #434242;">

			<style>
				.site-header:after {
					background-color: #434242;
				}
			</style>

			<div class="header-top">
				<div class="container">
					<div class="header-top-row">

						<div class="header-menu-btn"><span class="icon-bar"></span></div>

						<div class="header-logo">
							<a<? if (!$isIndex) { ?> href="<?= SITE_DIR ?>"<? } ?> class="logo">
								<img src="<?= SITE_TEMPLATE_PATH ?>/img/logo.svg" alt="">
							</a>
						</div>

                        <?$APPLICATION->IncludeComponent("bitrix:menu", "catalog_gender", array(
                                "ROOT_MENU_TYPE" => "catalog",
                                "MENU_CACHE_TYPE" => "A",
                                "MENU_CACHE_TIME" => "36000",
                                "MENU_CACHE_USE_GROUPS" => "N",
                                "MENU_THEME" => "",
                                "CACHE_SELECTED_ITEMS" => "N",
                                "MENU_CACHE_GET_VARS" => array(),
                                "MAX_LEVEL" => "3",
                                "CHILD_MENU_TYPE" => "",
                                "USE_EXT" => "Y",
                                "DELAY" => "N",
                                "ALLOW_MULTI_SELECT" => "N",
                            ),
                            false
                        );?>

						<div class="header-menu">
                            <?$APPLICATION->IncludeComponent("bitrix:menu", "main", array(
                                    "ROOT_MENU_TYPE" => "main",
                                    "MENU_CACHE_TYPE" => "A",
                                    "MENU_CACHE_TIME" => "36000",
                                    "MENU_CACHE_USE_GROUPS" => "N",
                                    "MENU_THEME" => "",
                                    "CACHE_SELECTED_ITEMS" => "N",
                                    "MENU_CACHE_GET_VARS" => array(),
                                    "MAX_LEVEL" => "1",
                                    "CHILD_MENU_TYPE" => "",
                                    "USE_EXT" => "N",
                                    "DELAY" => "N",
                                    "ALLOW_MULTI_SELECT" => "N",
                                ),
                                false
                            );?>
						</div>

						<div class="header-acc">
							<nav class="acc-links-nav">
                                <?$APPLICATION->IncludeFile(
                                    '/ajax/favorite.php',
                                    Array(),
                                    Array('MODE' => 'php')
                                );?>
                                <?$APPLICATION->IncludeFile(
                                    '/ajax/header_profile.php',
                                    Array(),
                                    Array('MODE' => 'php')
                                );?>
                                <?$APPLICATION->IncludeFile(
                                    '/ajax/cart.php',
                                    Array('RETURN_SMALL_CART' => 'Y'),
                                    Array('MODE' => 'php')
                                );?>
							</nav>
						</div>

					</div>
				</div>
			</div>

			<div class="header-bottom">
				<div class="container">
					<div class="header-bottom-row">

						<div class="open-header-catalog-btn">Каталог товаров</div>

                        <?$APPLICATION->IncludeComponent("bitrix:menu", "catalog", array(
                                "ROOT_MENU_TYPE" => "catalog",
                                "MENU_CACHE_TYPE" => "A",
                                "MENU_CACHE_TIME" => "36000",
                                "MENU_CACHE_USE_GROUPS" => "N",
                                "MENU_THEME" => "",
                                "CACHE_SELECTED_ITEMS" => "N",
                                "MENU_CACHE_GET_VARS" => array(),
                                "MAX_LEVEL" => "3",
                                "CHILD_MENU_TYPE" => "",
                                "USE_EXT" => "Y",
                                "DELAY" => "N",
                                "ALLOW_MULTI_SELECT" => "N",
                            ),
                            false
                        );?>


						<div class="header-search">

							<a href="#" class="search-link">
								<span class="icon-search"></span>
							</a>

							<div class="search-dropdown">
								<div class="search-dropdown-content">

									<div class="search-dropdown-close"><span class="icon-close"></span></div>

									<form class="search-form" action="/catalog/search/">
										<span class="search-autocomplete" style="display: block;"></span>
										<input type="text" class="search-input" name="q" value="" placeholder="Я хочу найти">
									</form>

									<div class="search-results">

										<div class="h6">Товары</div>

										<div class="search-results-items">

										</div>

                                        <?/*
										<div class="h6">Коллекции</div>

										<div class="search-collections">
											<ul>
												<li><a href="#">Summer 2020</a></li>
												<li><a href="#">Summer 2020</a></li>
												<li><a href="#">Summer 2020</a></li>
												<li><a href="#">Summer 2020</a></li>
												<li><a href="#">Summer 2020</a></li>
												<li><a href="#">Summer 2020</a></li>
												<li><a href="#">Summer 2020</a></li>
												<li><a href="#">Summer 2020</a></li>
											</ul>
										</div>
                                        */?>
									</div>

								</div>
							</div>

						</div>

					</div>
				</div>
			</div>

		</header>

        <? if (!$isDynamic) { ?>
        <main class="main">

            <?$APPLICATION->IncludeComponent(
                "bitrix:breadcrumb",
                "",
                Array(
                    "PATH" => "",
                    "SITE_ID" => "s1",
                    "START_FROM" => "0"
                )
            );?>

            <div class="page-title">
                <div class="container">
                    <h1><? $APPLICATION->ShowTitle(false); ?></h1>
                </div>
            </div>

            <section class="s-article">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
        <? } ?>