# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

# Keep class names for React Native
-keep public class com.facebook.react.** { *; }
-keep public class com.facebook.hermes.** { *; }
-keep public class com.facebook.jni.** { *; }

# Prevent stripping native libraries
-keep class com.facebook.soloader.** { *; }
-keep class com.facebook.react.turbomodule.** { *; }

# Keep annotations
-keepattributes *Annotation*

# Keep access to native methods
-keepclassmembers class * { native <methods>; }

